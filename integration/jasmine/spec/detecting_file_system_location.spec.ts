import 'mocha';

import { expect, ifExitCodeIsOtherThan, logOutput, PickEvent } from '@integration/testing-tools';
import { SceneFinished, SceneStarts, TestSuiteFinished, TestSuiteStarts } from '@serenity-js/core/lib/events';
import { Name } from '@serenity-js/core/lib/model';
import { jasmine } from '../src/jasmine';

describe('@serenity-js/jasmine', function () {

    this.timeout(5000);

    it('detects the filesystem location of a test suite and individual specs', () => jasmine('examples/location.spec.js')
        .then(ifExitCodeIsOtherThan(0, logOutput))
        .then(res => {

            expect(res.exitCode).to.equal(0);

            PickEvent.from(res.events)
                .next(TestSuiteStarts,         event => {
                    expect(event.details.name).to.equal(new Name('Jasmine'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
                .next(TestSuiteStarts,         event => {
                    expect(event.details.name).to.equal(new Name('Detecting file system location'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
                .next(SceneStarts,         event => {
                    expect(event.details.name).to.equal(new Name('Detecting file system location works for both the suites and the individual specs'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
                .next(SceneFinished,       event => {
                    expect(event.details.name).to.equal(new Name('Detecting file system location works for both the suites and the individual specs'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
                .next(TestSuiteFinished,   event => {
                    expect(event.details.name).to.equal(new Name('Detecting file system location'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
                .next(TestSuiteFinished,   event => {
                    expect(event.details.name).to.equal(new Name('Jasmine'));
                    expect(event.details.location.path.value).to.match(/location.spec.js$/);
                    expect(event.details.location.line).to.equal(1);
                    expect(event.details.location.column).to.equal(1);
                })
            ;
        }));
});
