# /workspaces/FullStack/src/api/Dockerfile

# 1. Base mínima de Python
FROM python:3.11-slim

# 2. Directorio de trabajo interno
WORKDIR /app

# 3. Copiamos requirements.txt e instalamos dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copiamos todo el código de la carpeta api/ al contenedor
COPY . .

# 5. Exponemos el puerto en el que Gunicorn escuchará
ENV PORT 8080

# 6. Comando por defecto: ejecuta Gunicorn apuntando a app:app
#    (asume que tu punto de arranque está en app.py y define `app = Flask(__name__)`)
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
