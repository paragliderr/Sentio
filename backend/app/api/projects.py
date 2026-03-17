from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter()

@router.post("/")
def create_project(title: str, description: str, db: Session = Depends(get_db)):
    new_project = models.Project(
        title=title,
        description=description
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project