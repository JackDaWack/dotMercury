from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Email Client API"
    environment: str = "development"
    graph_base_url: str = "https://graph.microsoft.com/v1.0"
    GRAPH_TENANT_ID: str | None = None
    GRAPH_CLIENT_ID: str | None = None
    GRAPH_CLIENT_SECRET: str | None = None
    graph_access_token: str | None = None



    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

settings = Settings()