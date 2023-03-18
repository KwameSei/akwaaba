#!/usr/bin/env python3
"""Module of user class"""
from datetime import datetime
from models.engine.database import Base
# from role_users import roles_users
from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime
#from models import storage_type
from sqlalchemy.orm import relationship


class User(Base):
    """Inherits from BaseModel class and adds user's functionalities"""
    __tablename__ = 'users'
    #if storage_type == 'db':
    id=Column(Integer, primary_key=True, autoincrement=True)
    public_id = Column(String(100), nullable=False, unique=True)
    email = Column(String(100), nullable=False)
    password = Column(Text, nullable=False)
    username = Column(String(100), nullable=False)
    phone = Column(String(50), nullable=True)
    address = Column(String(100), nullable=True)
    status = Column(Boolean, default=True)
    all_events = relationship('All_Event', back_populates='user')
    is_admin = Column(Boolean, default=False)
    # is_super_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    # roles = relationship('Role', secondary=roles_users, backref='roled')
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
        #events = relationship("Event", backref="user")

    # Return string representation of the module
    def __repr__(self):
        return f"<User id={self.id} email={self.email} username={self.username}\
            phone={self.phone} address={self.address} status={self.status}>"
    
    def to_dict(self):
        event_dict = {
            "id": self.id,
            "public_id": self.public_id,
            "is_admin": self.is_admin,
            "email": self.email,
            "password": self.password,
            "username": self.username,
            "phone": self.phone,
            "address": self.address,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        return event_dict