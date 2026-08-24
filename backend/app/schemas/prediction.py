from typing import Dict

from pydantic import BaseModel


class PredictionResponse(BaseModel):

    state: str

    confidence: float

    drowsy_score: float

    alarm: bool

    features: Dict[str, float]