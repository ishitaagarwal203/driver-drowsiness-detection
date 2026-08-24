from collections import deque
import time


class TemporalFeatureTracker:

    def __init__(self, window_seconds=10.0):

        self.window_seconds = window_seconds

        self.eye_history = deque()
        self.mar_history = deque()

        self.blink_count = 0
        self.yawn_count = 0

        self.eye_closed = False
        self.eye_closed_start = None

        self.mouth_open = False
        self.mouth_open_start = None

        self.last_update_time = None

    def update(self, ear, mar):

        current_time = time.time()

        # ------------------------------------------------
        # Eye state
        # ------------------------------------------------

        eyes_closed = ear < 0.21

        if eyes_closed and not self.eye_closed:

            self.eye_closed = True
            self.eye_closed_start = current_time

        elif not eyes_closed and self.eye_closed:

            duration = (
                current_time -
                self.eye_closed_start
            )

            # Short closure = blink
            if duration < 1.0:
                self.blink_count += 1

            self.eye_closed = False
            self.eye_closed_start = None


        # ------------------------------------------------
        # Mouth state
        # ------------------------------------------------

        mouth_open = mar >= 0.55

        if mouth_open and not self.mouth_open:

            self.mouth_open = True
            self.mouth_open_start = current_time

        elif not mouth_open and self.mouth_open:

            duration = (
                current_time -
                self.mouth_open_start
            )

            if duration >= 1.0:
                self.yawn_count += 1

            self.mouth_open = False
            self.mouth_open_start = None


        # ------------------------------------------------
        # Store eye state
        # ------------------------------------------------

        self.eye_history.append(
            (
                current_time,
                eyes_closed,
                ear
            )
        )

        # ------------------------------------------------
        # Store MAR
        # ------------------------------------------------

        self.mar_history.append(
            (
                current_time,
                mar
            )
        )


        # ------------------------------------------------
        # Remove old data
        # ------------------------------------------------

        cutoff = (
            current_time -
            self.window_seconds
        )

        while (
            self.eye_history
            and self.eye_history[0][0] < cutoff
        ):
            self.eye_history.popleft()

        while (
            self.mar_history
            and self.mar_history[0][0] < cutoff
        ):
            self.mar_history.popleft()


        # ------------------------------------------------
        # PERCLOS
        # ------------------------------------------------

        perclos = self.calculate_perclos()


        # ------------------------------------------------
        # Blink rate
        # ------------------------------------------------

        blink_rate = (
            self.blink_count /
            self.window_seconds
        ) * 60


        # ------------------------------------------------
        # Current eye closure duration
        # ------------------------------------------------

        if self.eye_closed:

            closure_duration = (
                current_time -
                self.eye_closed_start
            )

        else:

            closure_duration = 0.0


        # ------------------------------------------------
        # Current yawn duration
        # ------------------------------------------------

        if self.mouth_open:

            yawn_duration = (
                current_time -
                self.mouth_open_start
            )

        else:

            yawn_duration = 0.0


        return {
            "perclos": perclos,
            "blink_rate": blink_rate,
            "closure_duration": closure_duration,
            "yawn_duration": yawn_duration,
            "blink_count": self.blink_count,
            "yawn_count": self.yawn_count
        }


    def calculate_perclos(self):

        if len(self.eye_history) < 2:

            return 0.0

        entries = list(
            self.eye_history
        )

        closed_time = 0.0

        total_time = (
            entries[-1][0] -
            entries[0][0]
        )

        if total_time <= 0:

            return 0.0

        for i in range(
            len(entries) - 1
        ):

            current_timestamp = (
                entries[i][0]
            )

            next_timestamp = (
                entries[i + 1][0]
            )

            eyes_closed = (
                entries[i][1]
            )

            duration = (
                next_timestamp -
                current_timestamp
            )

            if eyes_closed:

                closed_time += duration

        return min(
            max(
                closed_time / total_time,
                0.0
            ),
            1.0
        )