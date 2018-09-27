package com.yonyou.iuap.order.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.Socket;

public class CommonUtils {
    private static Logger logger = LoggerFactory.getLogger(CommonUtils.class);
    private static String localIp = null;

    public static String getLocalIp() {
        final String TEST_DOMAIN = "www.baidu.com";
        final String LOCALHOST = "127.0.0.1";
        int TEST_TIMEOUT = 2 * 1000;

        if (localIp != null) {
            return localIp;
        }

        final Outer<String> address = new Outer<String>();
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Socket s = new Socket(TEST_DOMAIN, 80);
                    String ip = s.getLocalAddress().getHostAddress();
                    s.close();
                    address.setValue(ip);
                } catch (Exception ex) {
                    address.setValue(LOCALHOST);
                }
            }
        });

        thread.start();

        try {
            thread.join(TEST_TIMEOUT);
        } catch (InterruptedException ex) {
        } catch (Exception ex) {
        }

        if (localIp == null) {
            localIp = address.value() != null ? address.value() : LOCALHOST;
        }

        return localIp;
    }
}
