export default function sortAlphabetically(files) {
    files.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
}

export default function sortAlphabeticallyReverse(files) {
    files.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return 1;
        }

        if (nameA > nameB) {
            return -1;
        }

        return 0;
    });
}

export default function sortBySize(files) {
    files.sort((a, b) => {
        let sizeA = a.size;
        let sizeB = b.size;

        if (sizeA < sizeB) {
            return -1;
        }

        if (sizeA > sizeB) {
            return 1;
        }

        return 0;
    });
}

export default function sortBySizeReverse(files) {
    files.sort((a, b) => {
        let sizeA = a.size;
        let sizeB = b.size;

        if (sizeA < sizeB) {
            return 1;
        }

        if (sizeA > sizeB) {
            return -1;
        }

        return 0;
    });
}