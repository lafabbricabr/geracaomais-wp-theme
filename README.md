# Geração Mais - Wordpress Theme

Tema para wordpress do site geracaomais.com.br

## Stack
* Linux Debian
* MySQL
* PHP
* Apache

## Deploy

### Server Debian 9

Atualização de pacotes
```
# apt-get update && apt-get upgrade
```

Escolha um hostname
```
# hostnamectl set-hostname eletric_server
```

Set o timezone corretamente (Bahia/Brasília são os indicados)
```
# dpkg-reconfigure tzdata

// Para checar:

# date
```

Set um usuário da aplicação se não quiser usar o root.

```
# apt install sudo
# adduser example_user sudo
# ssh example_user@ip.ip.ip.ip
```


### Deploy PHP, mysql e Apache

Referencia: https://linode.com/docs/web-servers/lamp/install-lamp-stack-on-ubuntu-16-04/

Use o tasksel para automatizar as dependencias

```
# apt install tasksel
# tasksel install lamp-server
```

#### Apache

```
# apt install apache2
```
* /etc/apache2/apache2.conf

```
KeepAlive On
MaxKeepAliveRequests 50
KeepAliveTimeout 5
```

* /etc/apache2/mods-available/mpm_prefork.conf
```
<IfModule mpm_prefork_module>
        StartServers            4
        MinSpareServers         3
        MaxSpareServers         40
        MaxRequestWorkers       200
        MaxConnectionsPerChild  10000
</IfModule>
```

Disable the event module and enable prefork:

```
# a2dismod mpm_event
# a2enmod mpm_prefork
```

Restart Apache

```
# systemctl restart apache2
```

copie o default Apache config para o config do site
```
# cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/example.com.conf
```

* /etc/apache2/sites-available/example.com.conf
```
<Directory /var/www/html/example.com/public_html>
        Require all granted
</Directory>
<VirtualHost *:80>
        ServerName example.com
        ServerAlias www.example.com
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/example.com/public_html

        ErrorLog /var/www/html/example.com/logs/error.log
        CustomLog /var/www/html/example.com/logs/access.log combined

</VirtualHost>
```

Crie os diretórios, caso não existam

```
# mkdir -p /var/www/html/example.com/{public_html,logs}
```

Linkando o sites-available com sites-enable

```
# a2ensite example.com.conf
```

Desabilitando o default:
```
# a2dissite 000-default.conf
```

Instale MySQL

```
# apt install mysql-server
```

Logue e crie o user e a DATABASE

```
# mysql -u root -p
```

Crie o USER
```
> ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'password';
```

Crie a base e de os privilegios
```
# CREATE DATABASE geracaomais;
# CREATE USER 'geracaomais' IDENTIFIED BY 'you-pass-here';
# GRANT ALL PRIVILEGES ON geracaomais.* TO 'geracaomais';
# quit
```

Se precisar mudar a senha de root do MySQL

```
# ALTER USER ‘root’@‘localhost’ IDENTIFIED WITH ‘mysql_native_password’ BY ‘password’;
```

#### PHP

Instalação
```
# apt install php7.0 libapache2-mod-php7.0 php7.0-mysql
# apt install php7.0-curl php7.0-json php7.0-cgi
```

Ajuste etc/php/7.0/apache2/php.ini

```
max_input_time = 30
error_reporting = E_COMPILE_ERROR | E_RECOVERABLE_ERROR | E_ERROR | E_CORE_ERROR
error_log = /var/log/php/error.log
```

Criação do log dir

```
sudo mkdir /var/log/php
sudo chown www-data /var/log/php
```
