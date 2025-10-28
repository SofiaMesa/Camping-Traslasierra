@echo off
:: === Actualizador automático del sitio Camping Traslasierra ===
:: Este script guarda, hace commit y sube los cambios a GitHub Pages

echo --------------------------------------------
echo 🔁 Actualizando repositorio: Camping Traslasierra
echo --------------------------------------------

:: 1) Navegar al directorio actual (por si se ejecuta desde acceso directo)
cd /d "%~dp0"

:: 2) Agregar todos los cambios
git add .

:: 3) Crear commit con fecha y hora
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set fecha=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set hora=%%a-%%b
git commit -m "Actualización automática %fecha% %hora%"

:: 4) Subir a GitHub
git push origin main

echo --------------------------------------------
echo ✅ Sitio actualizado correctamente.
echo (Abrí tu página en: https://github.com/SofiaMesa/Camping-Traslasierra/)
echo --------------------------------------------
pause
