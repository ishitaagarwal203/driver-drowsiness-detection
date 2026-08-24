import time


class YawningDetector:

    def __init__(
        self,
        mar_threshold=0.55,
        minimum_yawn_duration=1.0
    ):

        self.mar_threshold = mar_threshold
        self.minimum_yawn_duration = minimum_yawn_duration

        self.mouth_open = False
        self.mouth_open_start = None

        self.yawn_count = 0

    def update(self, mar):

        current_time = time.time()

        mouth_is_open = mar >= self.mar_threshold

        # Mouth just opened
        if mouth_is_open and not self.mouth_open:

            self.mouth_open = True
            self.mouth_open_start = current_time

        # Mouth remains open
        elif mouth_is_open and self.mouth_open:

            pass

        # Mouth just closed
        elif not mouth_is_open and self.mouth_open:

            duration = (
                current_time -
                self.mouth_open_start
            )

            if duration >= self.minimum_yawn_duration:

                self.yawn_count += 1

            self.mouth_open = False
            self.mouth_open_start = None

        # Current mouth-open duration
        if self.mouth_open:

            open_duration = (
                current_time -
                self.mouth_open_start
            )

        else:

            open_duration = 0.0

        # Current yawning state
        yawning = (
            self.mouth_open
            and open_duration >= self.minimum_yawn_duration
        )

        return {
            "mar": mar,
            "mouth_open": self.mouth_open,
            "open_duration": open_duration,
            "yawn_count": self.yawn_count,
            "yawning": yawning
        }