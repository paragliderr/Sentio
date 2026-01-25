from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SignupRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {"status": "Sentio backend running"}

@app.post("/signup")
def signup(data: SignupRequest):
    return {
        "message": "Signup received",
        "email": data.email
    }
