from pydantic import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "CaptureD2L API"
    admin_email: str

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


__all__ = [Settings, get_settings]
