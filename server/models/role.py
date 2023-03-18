#!/usr/bin/env python3
"""Role module for Akwaaba project"""

from datetime import datetime
from models.engine.database import Base
from flask_security import RoleMixin
#from models import storage_type
from sqlalchemy import Column, String, ForeignKey, DateTime, Float, Text, Boolean, Integer
from sqlalchemy.orm import relationship

class Role(Base, RoleMixin):
    """The role class"""
    __tablename__ = 'roles'
    id = Column(Integer(), primary_key=True)
    name = Column(String(80), unique=True)
