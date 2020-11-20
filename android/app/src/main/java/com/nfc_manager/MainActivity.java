package com.nfc_manager;
import android.app.Activity;
import com.facebook.react.ReactActivity;

import android.os.Bundle;

import com.nfc_manager.kiosk.KioskMode;

public class MainActivity extends ReactActivity {

  public static KioskMode kioskMode;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      
      
      kioskMode = new KioskMode(this);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "nfc_manager";
  }
}
