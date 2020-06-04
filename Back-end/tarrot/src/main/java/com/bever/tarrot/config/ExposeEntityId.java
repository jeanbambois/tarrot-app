package com.bever.ecommerce.config;

import com.bever.ecommerce.entity.Product;
import com.bever.ecommerce.entity.ProductCategory;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
public class ExposeEntityId extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Product.class, ProductCategory.class);
    }
}
