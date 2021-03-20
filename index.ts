import * as pulumi from "@pulumi/pulumi";

import { TestResource, TestResourceArgs } from './provider'

const args: TestResourceArgs = {
  // serialized: true
}

const testResource = new TestResource('test-resource', args)

export const isSerialized = testResource.serialized
