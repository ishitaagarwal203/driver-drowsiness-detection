import time


class DrowsinessState:

    def __init__(
        self,
        ear_threshold=0.21,
        closure_time_threshold=1.0
    ):
        self.ear_threshold = ear_threshold
        self.closure_time_threshold = closure_time_threshold

        self.eyes_closed = False
        self.eye_closed_start_time = None

        self.blink_count = 0

        self.last_state = "OPEN"

    def update(self, ear):
        """
        Update eye state using the current EAR.

        Returns a dictionary containing the
        current eye/drowsiness information.
        """

        current_time = time.time()

        # Determine eye state
        currently_closed = ear < self.ear_threshold

        # --------------------------------
        # Eyes have just closed
        # --------------------------------

        if currently_closed and not self.eyes_closed:

            self.eyes_closed = True
            self.eye_closed_start_time = current_time

            self.last_state = "CLOSED"

        # --------------------------------
        # Eyes remain closed
        # --------------------------------

        elif currently_closed and self.eyes_closed:

            closed_duration = (
                current_time - self.eye_closed_start_time
            )

        # --------------------------------
        # Eyes have opened again
        # --------------------------------

        elif not currently_closed and self.eyes_closed:

            closed_duration = (
                current_time - self.eye_closed_start_time
            )

            # Short closure = blink
            if closed_duration < self.closure_time_threshold:

                self.blink_count += 1

            self.eyes_closed = False
            self.eye_closed_start_time = None

            self.last_state = "OPEN"

        else:

            closed_duration = 0.0

        # Calculate current closure duration
        if self.eyes_closed:

            closed_duration = (
                current_time - self.eye_closed_start_time
            )

        else:

            closed_duration = 0.0

        # Determine drowsiness
        drowsy = (
            self.eyes_closed
            and closed_duration >= self.closure_time_threshold
        )

        if drowsy:
            state = "DROWSY"

        elif self.eyes_closed:
            state = "EYES_CLOSED"

        else:
            state = "AWAKE"

        return {
            "state": state,
            "ear": ear,
            "eyes_closed": self.eyes_closed,
            "closure_duration": closed_duration,
            "blink_count": self.blink_count,
            "drowsy": drowsy
        }