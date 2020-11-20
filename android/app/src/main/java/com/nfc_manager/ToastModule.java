package com.nfc_manager;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.app.Activity;
import android.view.View;

import java.lang.Runnable;

import static com.nfc_manager.MainActivity.kioskMode;

public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "ToastExample";
  }

  @ReactMethod
    public void AtivarKioskMode(String ativo){
        try {
            if(ativo.equals("ativado")){
                kioskMode.startKiosMode();
            }else if(ativo.equals("desativado")){
                kioskMode.stopKioskMode();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    private void immersiveModeOn() {
        final Activity reactActivity = getCurrentActivity();
        final int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

        if (reactActivity != null) {
            reactActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    reactActivity.getWindow()
                        .getDecorView()
                        .setSystemUiVisibility(flags);
                }
            });
        }
    }


    @ReactMethod
    private void immersiveModeOff() {
        final Activity reactActivity = getCurrentActivity();
        final int flag = View.SYSTEM_UI_FLAG_VISIBLE;

        if (reactActivity != null) {
            reactActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    reactActivity.getWindow()
                        .getDecorView()
                        .setSystemUiVisibility(flag);
                }
            });
        }
    }
}