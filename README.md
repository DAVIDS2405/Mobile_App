# Agenda de Contactos
Creadores Miguel Carapaz, David Basantes, Jose Pinos.

# Link
https://schedule123dmj.web.app/

## Descripción

Esta aplicación de Agenda de Contactos te permite gestionar y organizar tus contactos de manera eficiente. Utiliza las siguientes tecnologías:

- Ionic
- Capacitor
- Android Studio
- Firebase

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de ejecutar la aplicación:

- Node.js: [Descargar e instalar Node.js](https://nodejs.org/)
- Ionic: Ejecuta `npm install -g @ionic/cli`
- Capacitor: Ejecuta `npm install -g @capacitor/cli`
- Android Studio: [Descargar e instalar Android Studio](https://developer.android.com/studio)
- Firebase: [Configurar un proyecto en Firebase](https://console.firebase.google.com/)

## Configuración

## Nota para Generar y Ejecutar la APK en un Dispositivo Android

Antes de comenzar, asegúrate de seguir los pasos de instalación y configuración mencionados anteriormente.

### Generar y Compilar la APK

Después de clonar el repositorio, sigue estos pasos para generar la APK y compilarla en Android Studio:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/agenda-contactos.git
    cd agenda-contactos
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura Capacitor:

    ```bash
    ionic build
    npx cap init
    ```

4. Agrega la plataforma Android:

    ```bash
    ionic cap add android
    ```

5. Abre el proyecto en Android Studio para compilar la APK:

    ```bash
    ionic cap open android
    ```

### Ejecutar la APK en un Dispositivo Android

Una vez que hayas compilado el proyecto en Android Studio, puedes ejecutar la APK en un dispositivo Android conectado a la PC:

1. Utiliza el siguiente comando para ejecutar la APK:

    ```bash
    ionic cap run android
    ```

Asegúrate de tener un dispositivo Android conectado a tu PC antes de ejecutar este comando.
