package com.vardygr;

import com.transistorsoft.rnbackgroundgeolocation.*;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactActivity;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import android.content.Intent;     // <--- import

import com.facebook.CallbackManager;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "vardygr";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mCallbackManager = new CallbackManager.Factory().create();
        ReactPackage packages[] = new ReactPackage[]{
                new MapsPackage(this),
                new MainReactPackage(),
                new RNBackgroundGeolocation(this),
                new FBSDKPackage(mCallbackManager),
        };
        return Arrays.<ReactPackage>asList(packages);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
