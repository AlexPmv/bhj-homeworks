const links = document.querySelectorAll('.has-tooltip');

document.body.addEventListener('click', (event) => {
    if (!event.target.classList.contains('has-tooltip')) {
        
        const activeTooltip = findActiveTooltip();

        if (activeTooltip) {
            activeTooltip.classList.remove('tooltip_active');
        };
    }
});

document.addEventListener('scroll', () => {
    const activeTooltip = findActiveTooltip();

    if (activeTooltip) {
        const currentLink = activeTooltip.previousElementSibling;
        [activeTooltip.style.left, activeTooltip.style.top] = getElementRect(currentLink, activeTooltip);
    };
})

function findActiveTooltip() {
    return tooltips.find((item) => item.classList.contains('tooltip_active'));
};

function getElementRect(element, relativeElement) {
    const elementBox = element.getBoundingClientRect();
    const relativeElementBox = relativeElement.getBoundingClientRect();

    if (element.dataset.position) {
        switch (element.dataset.position) {
        case 'top':
            return [`${elementBox.left}px`, `${elementBox.top - relativeElementBox.height}px`];
        case 'right':
            return [`${elementBox.right}px`, `${elementBox.top}px`];    
        case 'bottom':
            return [`${elementBox.left}px`, `${elementBox.top + elementBox.height}px`];    
        case 'left':
            return [`${elementBox.left - relativeElementBox.width}px`, `${elementBox.top}px`];    
        };
    };    

    return [`${elementBox.left}px`, `${elementBox.top + elementBox.height}px`]
}

for (const link of links) {
    
    link.insertAdjacentHTML('afterEnd', `<div class="tooltip">
    ${link.title}
    </div>`);

    link.addEventListener('click', (event) => {
            event.preventDefault();
            const siblingTooltip = event.currentTarget.nextElementSibling;
            

            if (siblingTooltip.classList.contains('tooltip_active')) {
                siblingTooltip.classList.remove('tooltip_active');
                return;
            };    

            if (!siblingTooltip.classList.contains('tooltip_active')) {
                const activeTooltip = findActiveTooltip();

                if (activeTooltip) {
                    activeTooltip.classList.remove('tooltip_active');
                }
                
                siblingTooltip.classList.add('tooltip_active');
                [siblingTooltip.style.left, siblingTooltip.style.top] = getElementRect(event.currentTarget, siblingTooltip);
            };
        });
};

const tooltips = Array.from(document.querySelectorAll('.tooltip'));




