import time


class AlarmService:

    def __init__(
        self,
        required_drowsy_frames=6,
        cooldown_seconds=3.0
    ):
        self.required_drowsy_frames = (
            required_drowsy_frames
        )

        self.cooldown_seconds = (
            cooldown_seconds
        )

        self.drowsy_frames = 0

        self.alarm_active = False

        self.last_alarm_time = 0.0

    def update(
        self,
        state,
        drowsy_score
    ):

        # -----------------------------------------
        # Drowsiness condition
        # -----------------------------------------

        is_drowsy = (
            state == "drowsy"
            and drowsy_score >= 0.70
        )

        if is_drowsy:

            self.drowsy_frames += 1

        else:

            # Reset when driver returns to
            # a non-drowsy state.

            self.drowsy_frames = 0

            self.alarm_active = False


        # -----------------------------------------
        # Activate alarm only after multiple frames
        # -----------------------------------------

        if (
            self.drowsy_frames
            >= self.required_drowsy_frames
        ):

            current_time = time.time()

            if (
                current_time
                - self.last_alarm_time
                >= self.cooldown_seconds
            ):

                self.alarm_active = True

                self.last_alarm_time = (
                    current_time
                )


        return {

            "alarm": self.alarm_active,

            "drowsy_frames":
                self.drowsy_frames,

            "required_frames":
                self.required_drowsy_frames
        }