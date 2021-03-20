import * as pulumi from "@pulumi/pulumi";

interface TestProviderArgs {
  serialized?: boolean;
}

class TestResourceProvider implements pulumi.dynamic.ResourceProvider {
  async create(input: TestProviderArgs): Promise<pulumi.dynamic.CreateResult> {
    const outs = {
      seralized: true,
    };

    console.log("State after Create", outs);

    return {
      id: Math.random().toString(),
      outs,
    };
  }

  async diff(
    id: pulumi.ID,
    olds: TestProviderArgs,
    news: TestProviderArgs
  ): Promise<pulumi.dynamic.DiffResult> {
    console.log('Initiate Diffing')

    let update: boolean = false;
    if (
      (olds.serialized === false && news.serialized !== false) ||
      (news.serialized === false && olds.serialized !== false)
    ) {
      update = true;
      console.log('Requires Update')
    } else {
      console.log('Does not require update')
    }

    return {
      changes: update,
    };
  }

  async update(
    id: pulumi.ID,
    olds: TestProviderArgs,
    news: TestProviderArgs
  ): Promise<pulumi.dynamic.UpdateResult> {
    const outs = {
      serialized: true
    };

    console.log("Outs after Update", outs);

    return {
      outs,
    };
  }

  async destroy(id: pulumi.ID, props: TestProviderArgs) {
    // Do Nothing
  }

  async read(
    id: pulumi.ID,
    props: TestProviderArgs
  ): Promise<pulumi.dynamic.ReadResult> {
    console.log("Read");

    return {
      props,
    };
  }
}

export interface TestResourceArgs {
  serialized?: pulumi.Input<boolean>;
}

export class TestResource extends pulumi.dynamic.Resource {
  public readonly serialized?: pulumi.Output<boolean>;

  constructor(
    name: string,
    args?: TestResourceArgs,
    opts?: pulumi.CustomResourceOptions
  ) {
    super(new TestResourceProvider(), name, { ...args }, opts);
  }
}
