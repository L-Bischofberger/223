package ch.wiss.m223securitsy.security;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//Entität, die eine Benutzerrolle repräsentiert
@Entity
@Table(name = "role")
public class Role {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;
@Enumerated(EnumType.STRING)
@Column(length = 20)
private ERole role;
public Role() { }
public Role(ERole role) {
 this.role = role;
}
public void setId(Integer id) {
    this.id = id;
}
public void setRole(ERole role) {
    this.role = role;
}
public Integer getId() {
    return id;
}
public ERole getRole() {
    return role;
}
}