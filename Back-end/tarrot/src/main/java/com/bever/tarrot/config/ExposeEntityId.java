package com.bever.tarrot.config;

import com.bever.tarrot.entity.Game;
import com.bever.tarrot.entity.User;
import com.bever.tarrot.entity.UserAddress;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
public class ExposeEntityId extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class, Game.class);
    }
}
