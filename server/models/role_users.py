# create a table for assigning roles to users
"""Module of user class"""
from sqlalchemy import Table, Column, Integer, ForeignKey

roles_users = Table('roles_users',
Column('user_id',Integer(),ForeignKey('user.id')),
Column('role_id',Integer(),ForeignKey('role.id')))