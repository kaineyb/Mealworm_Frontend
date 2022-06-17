#!/bin/bash

function get_branch() {
      git branch --no-color | grep -E '^\*' | awk '{print $2}' \
        || echo "default_value"
      # or
      # git symbolic-ref --short -q HEAD || echo "default_value";
}


function deploy_production_react() {
    #Start
    cd /home/arkus/repositories/Mealworm_Frontend
    
    # Build
    npm run build


    # Clear
    rm -r ~/mealworm.uk*

    # Copy Files over from local repo
    /bin/cp -r ~/repositories/Mealworm_Frontend/build/* ~/mealworm.uk
  
    # Tell me that it worked...!
    echo "Production Deployed!"
}

branch_name=`get_branch`;

if [ $branch_name == 'main' ]
then 
    deploy_production_react
fi