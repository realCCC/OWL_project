package com.codingrecipe.member.entity;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.*;

//Board table 에 관한 설정
@Entity
@Data
public class Board {

    @Id //PK의미
    @GeneratedValue(strategy =  GenerationType.IDENTITY) //mysql, mariadb 에서 사용
    private Integer id;

    private String title;

    private String content;

    private String filename;

    private String filepath;

    private String writer;

    private String nickname;


}
