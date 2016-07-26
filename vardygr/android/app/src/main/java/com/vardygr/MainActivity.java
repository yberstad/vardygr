package com.vardygr;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.mehcode.reactnative.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "vardygr";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Show the js-controlled splash screen
        SplashScreen.show(this);

        // After react is initialized; set our background color (override splash screen theme)
        getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                // Hide the native splash screen
                getWindow().getDecorView().setBackgroundColor(Color.WHITE);
            }
        });

        super.onCreate(savedInstanceState);

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
