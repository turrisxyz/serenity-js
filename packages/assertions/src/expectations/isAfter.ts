import { KnowableUnknown } from '@serenity-js/core';

import { Expectation } from '../Expectation';

export function isAfter(expected: KnowableUnknown<Date>): Expectation<Date> {
    return Expectation.thatActualShould<Date, Date>('have value that is after', expected)
        .soThat((actualValue, expectedValue) => actualValue.getTime() > expectedValue.getTime());
}
