#!/bin/bash
#
# Rails Ready
#
# Author: Josh Frye <joshfng@gmail.com>
# Licence: MIT
#
# Contributions from: Wayne E. Seguin <wayneeseguin@gmail.com>
# Contributions from: Ryan McGeary <ryan@mcgeary.org>
#

ruby_version=$1
ruby_version_string=$2
ruby_source_url=$3
ruby_source_tar_name=$4
ruby_source_dir_name=$5
whichRuby=$6
script_runner=$(whoami)
railsready_path=$7
log_file=$8

epel_repo_url="http://download.fedora.redhat.com/pub/epel/5/i386/epel-release-5-4.noarch.rpm"

#echo "vars set: $ruby_version $ruby_version_string $ruby_source_url $ruby_source_tar_name $ruby_source_dir_name $whichRuby $railsready_path $log_file"

# Add the EPEL repo if centos
echo -e "\n=> Adding EPEL repo..."
sudo rpm -Uvh $epel_repo_url
echo "==> done..."

# Install build tools
echo -e "\n=> Installing build tools..."
sudo yum install -y gcc-c++ patch \
 readline readline-devel zlib zlib-devel \
 libyaml-devel libffi-devel openssl-devel \
 make automake bash curl sqlite-devel mysql-devel >> $log_file 2>&1
echo "==> done..."

# Install imagemagick
echo -e "\n=> Installing imagemagick (this may take a while)..."
sudo yum install -y ImageMagick >> $log_file 2>&1
echo "==> done..."

# Install Git
echo -e "\n=> Installing git..."
sudo yum install -y git >> $log_file 2>&1
echo "==> done..."
