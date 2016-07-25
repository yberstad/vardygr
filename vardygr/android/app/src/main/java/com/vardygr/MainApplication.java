package com.vardygr;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;

import java.util.Arrays;
import java.util.List;

import io.fabric.sdk.android.Fabric;

public class MainApplication extends Application implements ReactApplication {
    CallbackManager mCallbackManager;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            mCallbackManager = new CallbackManager.Factory().create();
            ReactPackage packages[] = new ReactPackage[]{
                    new MapsPackage(),
                    new MainReactPackage(),
                    new SplashScreenPackage(),
                    new RNBackgroundGeolocation(),
                    new FBSDKPackage(mCallbackManager)
            };
            return Arrays.asList(packages);
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    // Updated your class body:
    @Override
    public void onCreate() {
        super.onCreate();
        //Fabric.with(this, new Crashlytics());
        // Initialize the SDK before executing any other operations,
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
    }
}
