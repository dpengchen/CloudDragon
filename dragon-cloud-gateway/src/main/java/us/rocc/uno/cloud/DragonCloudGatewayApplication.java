package us.rocc.uno.cloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient 
@SpringBootApplication
public class DragonCloudGatewayApplication {
    public static void main(String[] args) {
        // 对应 8848->9001, 9848->9003 的端口映射差值 (9001 + 2 = 9003)
        System.setProperty("nacos.server.grpc.port.offset", "2");
        SpringApplication.run(DragonCloudGatewayApplication.class, args);
    }
}