from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "dotMercury API"
    ENVIRONMENT: str = "development"
    GRAPH_BASE_URL: str = "https://graph.microsoft.com/v1.0"
    GRAPH_TENANT_ID: str | None = None
    GRAPH_CLIENT_ID: str | None = None
    GRAPH_CLIENT_SECRET: str | None = None
    GRAPH_ACCESS_TOKEN: str | None = None



    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()