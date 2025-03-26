
import psycopg2
import configparser

def get_db_connection():

    config = configparser.ConfigParser()
    config.read('db_config.ini')  # Path to your .ini file

    db_params = config['postgresql']
    return psycopg2.connect(
        dbname=db_params['dbname'],
        user=db_params['user'],
        password=db_params['password'],
        host=db_params['host'],
        port=db_params['port']
    )