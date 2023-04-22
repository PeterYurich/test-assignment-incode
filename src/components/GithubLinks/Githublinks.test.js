import { render } from "@testing-library/react";
import GithubLinks from "./GithubLinks";

describe(GithubLinks, () => {
    it("Links display right")
    const { getByTestId } = render(<GithubLinks />)
    const ownerLink = getByTestId('owner').textContent
    expect(ownerLink).toEqual('asdfasdf')
})
