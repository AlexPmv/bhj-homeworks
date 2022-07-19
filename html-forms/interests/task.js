const interestUlGroups = document.querySelectorAll('ul.interests');

function checkCheckedInterests(inserestNode) {
    if (!inserestNode[0]) {
        return;
    };

    const interestCheckNode = inserestNode[0].closest('.interests');
    const currentInterestMainNode = interestCheckNode.closest('.interest').querySelector('.interest__check');

    for (let i = 0, b = 0; i < inserestNode.length; i++) {
                    
        if (inserestNode[i].querySelector('.interest__check').checked) {
            b++;
        };

        if (i === inserestNode.length - 1) {
           if (b === i + 1) {
                currentInterestMainNode.indeterminate = false;
                currentInterestMainNode.checked = true;
            } else if (b === 0) {
                currentInterestMainNode.indeterminate = false;
                currentInterestMainNode.checked = false;
            } else {
                currentInterestMainNode.indeterminate = true;
            };
        };
    };
};

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
        interestLi.addEventListener('click', () => {
            checkCheckedInterests(interestLiGroup);
        });
    };

    checkCheckedInterests(interestLiGroup);
};




