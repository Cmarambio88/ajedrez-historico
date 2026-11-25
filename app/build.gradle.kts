plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "cl.ajedrezhistorico"
    compileSdk = 34

    defaultConfig {
        applicationId = "cl.ajedrezhistorico"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }

    // El juego completo vive en /web (HTML, CSS y JS) y se empaqueta tal cual dentro de la app.
    sourceSets["main"].assets.srcDir("../web")
}

dependencies {
    implementation("androidx.webkit:webkit:1.11.0")
}
