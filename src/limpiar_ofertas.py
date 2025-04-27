import sqlite3
import os

# Ruta a la base de datos SQLite (ajusta según tu configuración)
db_path = "instance/database.db"  # Esta es la ruta relativa típica para Flask

# Asegúrate de que la ruta sea correcta
if not os.path.exists(db_path):
    print(f"Error: No se encuentra la base de datos en {db_path}")
    # Intenta buscar en otras ubicaciones comunes
    possible_paths = [
        "../instance/database.db",
        "../../instance/database.db",
        "/workspaces/FullStack/instance/database.db"
    ]
    for path in possible_paths:
        if os.path.exists(path):
            db_path = path
            print(f"Base de datos encontrada en: {db_path}")
            break
    else:
        print("No se pudo encontrar la base de datos. Por favor, especifica la ruta correcta.")
        exit(1)

# Conectar a la base de datos
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Obtener la cantidad de registros antes de la limpieza
    cursor.execute("SELECT COUNT(*) FROM ofertas")
    total_antes = cursor.fetchone()[0]
    print(f"Total de ofertas antes de la limpieza: {total_antes}")
    
    # Mantener solo las últimas 8 ofertas por ID
    cursor.execute("""
    DELETE FROM ofertas 
    WHERE id NOT IN (
        SELECT id FROM ofertas ORDER BY id DESC LIMIT 8
    )
    """)
    
    # Confirmar los cambios
    conn.commit()
    
    # Verificar cuántos registros quedan
    cursor.execute("SELECT COUNT(*) FROM ofertas")
    total_despues = cursor.fetchone()[0]
    
    print(f"Limpieza completada. Se eliminaron {total_antes - total_despues} ofertas.")
    print(f"Ahora hay {total_despues} ofertas en la base de datos.")
    
except Exception as e:
    conn.rollback()
    print(f"Error al limpiar la base de datos: {e}")
    
finally:
    # Cerrar la conexión
    cursor.close()
    conn.close()