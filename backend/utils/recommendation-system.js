import Review from '../models/review.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

global.recommendationMatrix = [];
global.recommendationARMatrix = [];

const getUserAverageRating = (u) => {
    // Calculate user avarage rating
    return u.length != 0 ? u.reduce((a, b) => a + b) / u.length : 0;
};

const getSpecifiedArray = (a) => {
    // Remove null values from array
    return a.filter((item) => item !== null);
};

const getAverageRatingMatrix = (matrix, rows, columns) => {
    // Create avarage rating matrix: userRating - userAverageRating
    const averageRatingMatrix = new Array(rows);

    for (let u = 0; u < rows; u++) {
        averageRatingMatrix[u] = new Array(columns);
        for (let p = 0; p < columns; p++) {
            averageRatingMatrix[u][p] =
                matrix[u][p] === null
                    ? null
                    : matrix[u][p] - getUserAverageRating(getSpecifiedArray(matrix[u])) !== 0
                    ? matrix[u][p] - getUserAverageRating(getSpecifiedArray(matrix[u]))
                    : 0.1;
        }
    }

    return averageRatingMatrix;
};

const pearson = (u1, u2, uA1, uA2) => {
    // Pearson = sum( (x - xBar) * (y - yBar)) / squareRoot( sum( square(x - xBar) ) * sum( square(y - yBar) ) )

    const x = getSpecifiedArray(u1);
    const xA = getSpecifiedArray(uA1);
    const y = getSpecifiedArray(u2);
    const yA = getSpecifiedArray(uA2);

    const xBar = getUserAverageRating(x);
    const yBar = getUserAverageRating(y);

    // sum( (x - xBar) * (y - yBar))
    let sumXY = 0;
    const arrayLength = x.length < y.length ? x.length : y.length;
    for (let i = 0; i < arrayLength; i++) {
        sumXY += (x[i] - xBar) * (y[i] - yBar);
    }

    // sum( square(x - xBar)
    let sumSquareX = 0;
    for (let i = 0; i < xA.length; i++) {
        sumSquareX += xA[i] ** 2;
    }

    // sum( square(y - yBar)
    let sumSquareY = 0;
    for (let i = 0; i < yA.length; i++) {
        sumSquareY += yA[i] ** 2;
    }

    const pearson = sumXY / Math.sqrt(sumSquareX * sumSquareY);
    return pearson ? pearson : -1;
};

const getUserSimilarityValue = (userIndex, matrix, aRMatrix) => {
    const similarityValues = [];

    for (let i = 0; i < matrix.length; i++) {
        similarityValues.push(
            pearson(matrix[i], matrix[userIndex], aRMatrix[i], aRMatrix[userIndex])
        );
    }

    return similarityValues;
};

// const getUserSimilarityMatrix = (matrix, aRMatrix) => {
//     const similarityMatrix = [];

//     for (let i = 0; i < aRMatrix.length; i++) {
//         const similarityValues = getUserSimilarityValue(i, matrix, aRMatrix);
//         similarityMatrix.push(similarityValues);
//     }
//     return similarityMatrix;
// };

const predictUserRating = (userIndex, matrix, aRMatrix, itemIndex, k) => {
    const userSimilarityValues = getUserSimilarityValue(userIndex, matrix, aRMatrix);
    const sortedUserSimilarityValues = userSimilarityValues.slice().sort((a, b) => b - a);

    const userSimilarityIndexes = [];
    for (let i = 0; i < sortedUserSimilarityValues.length; i++) {
        userSimilarityValues.forEach((value) => {
            if (value === sortedUserSimilarityValues[i]) {
                if (userSimilarityIndexes.includes(userSimilarityValues.indexOf(value))) {
                    return;
                }
                return userSimilarityIndexes.push(userSimilarityValues.indexOf(value));
            }
        });
    }

    const itemRatedUsers = [];

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][itemIndex] != null) {
            itemRatedUsers.push(i);
        }
    }

    const similarityItemRatedUsers = [];

    for (let i = 0; i < itemRatedUsers.length; i++) {
        for (let j = 0; j < userSimilarityIndexes.length; j++) {
            if (
                itemRatedUsers.includes(userSimilarityIndexes[j]) &&
                !similarityItemRatedUsers.includes(userSimilarityIndexes[j])
            ) {
                similarityItemRatedUsers.push(userSimilarityIndexes[j]);
            }
        }
    }

    const kSimilarityItemRatedUsers = [];
    similarityItemRatedUsers.forEach((element, index) => {
        if (index < k) {
            kSimilarityItemRatedUsers.push(element);
        }
    });

    // userBar + sum( x * simX ) / sum( simX )
    const userBar = getUserAverageRating(getSpecifiedArray(matrix[userIndex]));

    let sumXSimX = 0;
    let sumSimX = 0;
    for (let i = 0; i < kSimilarityItemRatedUsers.length; i++) {
        sumXSimX +=
            aRMatrix[kSimilarityItemRatedUsers[i]][itemIndex] *
            userSimilarityValues[kSimilarityItemRatedUsers[i]];
        sumSimX += Math.abs(userSimilarityValues[kSimilarityItemRatedUsers[i]]);
    }

    const userPredictedRating = userBar + sumXSimX / sumSimX;
    return userPredictedRating;
};

const predictUserItemRatings = (userIndex, matrix, aRMatrix, k) => {
    const items = [];

    for (let i = 0; i < matrix[userIndex].length; i++) {
        if (matrix[userIndex][i] === null) {
            const rating = predictUserRating(userIndex, matrix, aRMatrix, i, k);
            if (!Number.isNaN(rating)) {
                items.push({ itemIndex: i, itemRating: rating });
            }
        }
    }

    return items.length !== 0 ? items.sort((a, b) => b.itemRating - a.itemRating) : items;
};

const recommend = (userIndex, kUsers) => {
    if (global.recommendationMatrix.length === 0 || global.recommendationARMatrix.length === 0) {
        return initializeMatrix();
    }

    // userIndex, matrix, aRMatrix, k Users
    const predictedItems = predictUserItemRatings(
        userIndex,
        global.recommendationMatrix,
        global.recommendationARMatrix,
        kUsers
    );

    return predictedItems;
};

const initializeMatrix = async () => {
    try {
        console.log('Initializing recommendation matrix...');
        const initializeTime = performance.now();

        const [users, products] = await Promise.all([
            User.find({}).select('_id').sort('createdAt').lean(),
            Product.find({}).sort('createdAt').lean(),
        ]);

        const rows = users.length;
        const columns = products.length;

        const matrix = new Array(rows);

        // Create matrix:
        // userID/productID: rating

        let valueCount = 0;
        for (let u = 0; u < users.length; u++) {
            matrix[u] = new Array(columns);
            for (let p = 0; p < products.length; p++) {
                const review = await Review.findOne({
                    createdBy: users[u]._id,
                    createdIn: products[p]._id,
                })
                    .select('rating')
                    .sort('createdAt')
                    .lean();
                matrix[u][p] = review ? review.rating : null;

                valueCount++;
            }
        }

        const averageRatingMatrix = getAverageRatingMatrix(matrix, rows, columns);
        // const userSimilarityMatrix = getUserSimilarityMatrix(matrix, averageRatingMatrix);

        // console.log('Initial Matrix-----------------------------');
        // console.log(matrix);
        // console.log('Average Rating Matrix----------------------');
        // console.log(averageRatingMatrix);
        // console.log('User Similarity Matrix---------------------');
        // console.log(userSimilarityMatrix);

        global.recommendationMatrix = matrix;
        global.recommendationARMatrix = averageRatingMatrix;
        global.preloadedProducts = products;

        console.log(
            `Recommendation matrix initialized... [${valueCount} values] [${
                performance.now() - initializeTime
            }ms]`
        );
    } catch (error) {
        console.log(error);
    }
};

export { initializeMatrix, recommend };
