psql -U yubraj -d sasto_yatra

postgres=# \c sasto_yatra;
You are now connected to database "sasto_yatra" as user "postgres".

sasto_yatra=# \dt
List of relations

admin
{
"fullName":"yube",
"email":"yube@gmail.com",
"password":"yube"
}

Previleges
GRANT INSERT ON TABLE user_data TO yubraj;

GRANT ALL PRIVILEGES ON TABLE user_data TO yubraj;

GRANT USAGE ON SCHEMA public TO yubraj;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO yubraj;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO yubraj;

\dp user_data

GRANT USAGE, SELECT ON SEQUENCE user_data_id_seq TO yubraj;


GRANT USAGE, SELECT ON SEQUENCE history_hid_seq TO yubraj;
