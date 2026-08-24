import time

import winsound


class DrowsinessAlarm:

    def __init__(
        self,
        required_duration=2.0,
        cooldown=5.0
    ):
        self.required_duration = required_duration
        self.cooldown = cooldown

        self.drowsy_start_time = None
        self.last_alarm_time = 0

        self.alarm_active = False

    def update(self, state):

        current_time = time.time()

        # ------------------------------------------
        # Not drowsy
        # ------------------------------------------

        if state != "drowsy":

            self.drowsy_start_time = None
            self.alarm_active = False

            return False

        # ------------------------------------------
        # Start drowsiness timer
        # ------------------------------------------

        if self.drowsy_start_time is None:

            self.drowsy_start_time = current_time

            return False

        # ------------------------------------------
        # How long has driver been drowsy?
        # ------------------------------------------

        drowsy_duration = (
            current_time -
            self.drowsy_start_time
        )

        # ------------------------------------------
        # Trigger alarm
        # ------------------------------------------

        if (
            drowsy_duration >=
            self.required_duration
        ):

            if (
                current_time -
                self.last_alarm_time
                >= self.cooldown
            ):

                self.trigger_alarm()

                self.last_alarm_time = (
                    current_time
                )

                self.alarm_active = True

                return True

        return False

    def trigger_alarm(self):

        print()
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print("!!! DROWSINESS DETECTED !!!")
        print("!!! WAKE UP !!!")
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print()

        # Windows beep
        winsound.Beep(
            1200,
            700
        )

        winsound.Beep(
            1500,
            700
        )