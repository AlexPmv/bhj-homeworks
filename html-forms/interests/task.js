const interestUlGroups = document.querySelectorAll('ul.interests');

for (const interestUl of interestUlGroups) {
    const currentInterestMainGroup = interestUl.closest('.interest').querySelector('.interest__check');
    const interestLiGroup = interestUl.querySelectorAll('.interest');
    
    currentInterestMainGroup.addEventListener('click', (event) => {
        const isChecked = event.currentTarget.checked;
        for (const interestCheck of interestUl.querySelectorAll('input.interest__check')) {
            interestCheck.checked = isChecked;
        };
    });

    for (const interestLi of interestLiGroup) {
        interestLi.addEventListener('click', (event) => {
            // debugger
            const interestChechNode = event.currentTarget.closest('.interests');
            const currentInterestMainNode = interestChechNode.closest('.interest').querySelector('.interest__check');

            for (let i = 0, b = 0; i < interestLiGroup.length; i++) {
                    
                if (interestLiGroup[i].querySelector('.interest__check').checked) {
                    b++;
                };

                if (i === interestLiGroup.length - 1) {
                    if (b === i + 1) {
                        currentInterestMainNode.indeterminate = false;
                        currentInterestMainNode.checked = true;
                    } else {
                        currentInterestMainNode.indeterminate = true;
                    };
                };
            };
        });
    };
};


