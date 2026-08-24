from collections import deque
import time


class PerclosCalculator:

    def __init__(
        self,
        window_seconds=10.0,
        ear_threshold=0.21
    ):
        self.window_seconds = window_seconds
        self.ear_threshold = ear_threshold

        # Stores:
        # (timestamp, eyes_closed)
        self.history = deque()

    def update(self, ear):
        """
        Add the current EAR observation and
        calculate PERCLOS over the configured
        time window.
        """

        current_time = time.time()

        # Determine whether eyes are closed
        eyes_closed = ear < self.ear_threshold

        # Add current observation
        self.history.append(
            (current_time, eyes_closed)
        )

        # Remove observations older than window
        cutoff_time = (
            current_time - self.window_seconds
        )

        while (
            self.history
            and self.history[0][0] < cutoff_time
        ):
            self.history.popleft()

        # Not enough data yet
        if len(self.history) < 2:
            return 0.0

        # Calculate closed duration
        closed_duration = 0.0

        entries = list(self.history)

        for i in range(len(entries) - 1):

            timestamp = entries[i][0]
            next_timestamp = entries[i + 1][0]

            eyes_were_closed = entries[i][1]

            duration = (
                next_timestamp - timestamp
            )

            if eyes_were_closed:

                closed_duration += duration

        # Account for the current state
        if self.history[-1][1]:

            closed_duration += 0.0

        # Actual observed duration
        observed_duration = (
            entries[-1][0] - entries[0][0]
        )

        if observed_duration <= 0:
            return 0.0

        perclos = (
            closed_duration / observed_duration
        )

        return min(max(perclos, 0.0), 1.0)