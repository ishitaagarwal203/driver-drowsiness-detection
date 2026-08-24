from collections import deque


class PredictionSmoother:

    def __init__(
        self,
        window_size=10,
        drowsy_threshold=0.6
    ):

        self.window_size = window_size

        self.drowsy_threshold = (
            drowsy_threshold
        )

        self.predictions = deque(
            maxlen=window_size
        )


    def update(
        self,
        prediction,
        probability
    ):

        self.predictions.append(
            (
                prediction,
                probability
            )
        )


        if not self.predictions:

            return {
                "state": "unknown",
                "drowsy_score": 0.0
            }


        drowsy_score = sum(

            probability

            for prediction, probability
            in self.predictions

            if prediction == "drowsy"

        ) / len(self.predictions)


        if (
            drowsy_score >=
            self.drowsy_threshold
        ):

            state = "drowsy"

        else:

            # Most recent prediction
            state = (
                self.predictions[-1][0]
            )


        return {
            "state": state,
            "drowsy_score": drowsy_score
        }