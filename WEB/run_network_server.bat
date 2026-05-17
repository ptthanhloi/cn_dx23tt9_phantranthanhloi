@echo off
title Hotel Premium - Network Server
echo ========================================================
echo DANG KHOI DONG MAY CHU MANG NOI BO...
echo ========================================================

:: Kich hoat moi truong ao
if exist env\Scripts\activate.bat (
    call env\Scripts\activate.bat
) else (
    echo [ERROR] Khong tim thay thu muc moi truong ao 'env'.
    pause
    exit /b
)

:: Lay dia chi IP noi bo (Windows)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr /i "192.168."') do set IP=%%a
set IP=%IP: =%

echo --------------------------------------------------------
echo IP CUA MAY BAN: %IP%
echo CAC MAY KHAC TRUY CAP VAO: http://%IP%:8000
echo --------------------------------------------------------

:: Chay server Django o che do cong khai (0.0.0.0)
python manage.py runserver 0.0.0.0:8000

pause
