package com.bever.tarrot.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user_address")
@Data
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "street_number")
    private int streetNumber;

    @Column(name = "street")
    private String street;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    @OneToOne(mappedBy = "address")
    private User user;
}
