from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(
    'mysql+pymysql://moo:root@localhost:3306/LibraryService', echo=True, pool_recycle=3600)

Session = scoped_session(sessionmaker(bind=engine))
