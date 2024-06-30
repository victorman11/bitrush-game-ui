import { PropsWithChildren } from 'react'

const Paragraph = ({ children }: PropsWithChildren) => (
  <p className="typography-xs font-light">{children}</p>
)

const Subtitle = ({ children }: PropsWithChildren) => (
  <p className="typography-base">{children}</p>
)

const TermsAndConditionsContent = () => {
  return (
    <p className="text-bitrush-neutral-0">
      <p className="text-[1.3rem]">Terms & Conditions</p>
      <br />
      <Subtitle>Terms</Subtitle>
      <br />
      <Paragraph>
        These terms of service define the relationship between the operator and
        the end user regarding the use of the website provided at bitrush.com
        (&quot;the service&quot;).
      </Paragraph>
      <br />
      <Subtitle>Prohibited users</Subtitle>
      <br />
      <Paragraph>
        Users that are citizens or residents of any of the following
        jurisdictions are prohibited from using the service:
      </Paragraph>
      <br />
      <Paragraph>- Australia</Paragraph>
      <Paragraph>- Costa Rica</Paragraph>
      <Paragraph>- France</Paragraph>
      <Paragraph>- Netherlands</Paragraph>
      <Paragraph>- United States of America</Paragraph>
      <Paragraph>
        - Users younger than 18 years of age are prohibited from using the
        service.
      </Paragraph>
      <br />
      <Paragraph>
        Users for which using the service is not legal in their applicable
        jurisdiction(s) are prohibited from using the service.
      </Paragraph>
      <br />
      <Paragraph>
        Ensuring they are legally permitted to use the service is the
        user&apos;s responsibility. The operator makes no claims and provides no
        guarantees that using the service is legal for the user.
      </Paragraph>
      <br />
      <Paragraph>
        To ensure that no prohibited users are using the service, the operator
        may demand proof of age, citizenship, and residence of any user at their
        own discretion. If the user does not provide adequate proof at the
        operator&apos;s request, they may be barred from further using the
        service.
      </Paragraph>
      <br />
      <Subtitle>Account access</Subtitle>
      <br />
      <Paragraph>
        An account&apos;s owner is authenticated solely by their login
        credentials: the combination of their username, password, and two-factor
        authentication method (if enabled). The operator need not accept any
        other form of authentication. The user acknowledges that they may
        permanently lose access to their account and all funds contained within
        if they lose their login credentials.
      </Paragraph>
      <br />
      <Paragraph>
        The user is responsible for securing their login credentials. The
        operator shall not be liable for lost user accounts or the funds
        contained within or any other resulting damages if the user knowingly or
        unknowingly provides a third party with their login credentials,
        especially but not limited to the user falling victim to social
        engineering or malware attacks.
      </Paragraph>
      <br />
      <Paragraph>
        By voluntarily deleting their account, the user forfeits any remaining
        balance and bankroll investments of the account.
      </Paragraph>
      <br />
      <Subtitle>Deposits & withdrawals</Subtitle>
      <br />
      <Paragraph>
        Only Bitcoin is accepted for deposits and withdrawals. Other
        cryptocurrencies sent to the service&apos;s deposit addresses cannot be
        accessed by the operator and will not be credited to the user&apos;s
        account or returned to the user.
      </Paragraph>
      <br />
      <Paragraph>
        In the case of blockchain forks, the operator may decide which chain is
        considered to be Bitcoin at their discretion. The operator may choose to
        make the proceeds of Bitcoin forks or airdrops available to the user or
        not at their sole discretion.
      </Paragraph>
      <br />
      <Paragraph>
        The operator attempts to process all withdrawals instantly unless the
        user explicitly opts to queue their withdrawal. The operator shall not
        be liable for delayed withdrawals, including those that are delayed
        through fault of the operator.
      </Paragraph>
      <br />
      <Paragraph>
        The operator may temporarily halt all deposits to and withdrawals from
        the service if they deem it necessary to ensure the safety of
        users&apos; funds (e.g., in the event of blockchain forks) or for any
        other important reason.
      </Paragraph>
      <br />
      <Subtitle>Betting</Subtitle>
      <br />
      <Paragraph>
        All bets are final. The operator will not provide refunds of lost bets,
        including but not limited to accidentally submitted bets or bets lost
        due to network latency. In the case of a dispute, the information
        received and recorded by the service in its database shall be decided.
      </Paragraph>
      <br />
      <Paragraph>
        Use of the script editor and the automated betting feature is voluntary.
        The operator assumes no liability for malfunctioning scripts. Investing
      </Paragraph>
      <br />
      <Paragraph>
        The user acknowledges that bankroll investments are highly volatile, are
        not guaranteed to earn a profit, and carry a substantial risk of loss.
      </Paragraph>
      <br />
      <Paragraph>
        Bankroll investments are governed by the terms shown on the bankroll
        management page and in the help section. The operator may unilaterally
        change these terms with immediate effect and without advance notice at
        any time.
      </Paragraph>
      <br />
      <Paragraph>
        The operator may choose to award otherwise lost bets that encountered
        technical difficulties (e.g., server crash) to players at their sole
        discretion and at the cost to the bankroll investors. Investment
        operations (including divestments) are irreversible, and the operator
        shall not be liable for investment operations accidentally taken by the
        user.
      </Paragraph>
      <br />
      <Subtitle>Betting</Subtitle>
      <br />
      <Paragraph>
        The user agrees to abide by the chat rules. The operator may temporarily
        or permanently prevent users that violate the chat rules or are
        otherwise disruptive from participating in the chat at the
        operator&apos;s sole discretion and without any warning.
      </Paragraph>
      <br />
      <Paragraph>
        The operator is not liable for content that other users post or link to
        in the chat.
      </Paragraph>
      <br />
      <Paragraph>
        The service is not a trading forum, and the operator discourages all
        sorts of trading or other dealings among players. The operator will not
        intervene in disputes among players under any circumstances and shall
        not be liable for any losses arising from such disputes.
      </Paragraph>
      <br />
      <Subtitle>Forfeiture of dormant accounts</Subtitle>
      <br />
      <Paragraph>
        The operator may permanently delete accounts that have not been accessed
        for two years and may make usernames of deleted accounts available for
        use with new accounts again.
      </Paragraph>
      <br />
      <br />
    </p>
  )
}

export { TermsAndConditionsContent }
