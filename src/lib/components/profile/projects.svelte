<script>
  import ProjectEntry from "./project_entry.svelte";
  import MysteriousVendorMessage from "./mysterious_vendor_message.mdx"

  import { createCollapsible, melt } from '@melt-ui/svelte'
  const {
    elements: { root, content, trigger },
    states: { open }
  } = createCollapsible()

</script>

<ProjectEntry
  name="RuPost Desktop"
  link="https://rupost.ru/desktop"
  description="A desktop email and calendar client based on
    Mozilla Thunderbird Supernova"
  date="02.2022 - ..."
  participation="
    UI/UX design,
    transition to git from mercurial workflow,
    local dev/build environment development cycle based on Mozilla Mach,
    various privacy enhancements including telemetry removal and Remote Settings/Kinto decoupling from hosred by Mozilla services
    "
>
  XPCOM | VanillaJS (native web components) | CSS | Python (mozilla mach, poetry + ruff) | Rust
</ProjectEntry>

<ProjectEntry
  name="RuPost"
  link="https://rupost.ru"
  date="12.2020 - 02.2022"
  description="An out-of-the-box batteries-included
    IMAP/SMTP/CalDAV/CardDAV on-premise email
    server solution based on Postfix and Dovecot"
  participation="
    Analysis, deployment, and finalised selection of MTA/MDA components,
    that are Postfix and Dovecot,
    architecture, approach and development of Proof-Of-Concept and
    additional development up until release 2.0,
    UI and UX design and development of VanillaJS-KnockoutJS 3 components-backed Bootstrap 4 administraction panel,
    selection, coordination and analysis of admin panel migration process to a different UI framework, settling with React/MobX"
>
  Python (Flask, SQLAlchemy, postgreSQL, poetry + ruff + flake8) |
  VanillaJS native web components |
  KnockoutJS 3 + SPA Router
</ProjectEntry>

<ul>
  <li>Additional research and deployment of various infrastructure components:
    Exim, Postfix, Dovecot, LMTP and LDAP authentication setup,
    Amavis, Active Directory, FreeIPA
  </li>
  <li>
    Development of YAML-based (strict yaml derivation)
    templating and abstraction engine/mapper for unified
    translation and representation of every individual
    mailflow component configuration files' syntax
    (and it's admin guide/user manual) - i.e. postfix's master.conf, main.conf,
    it started as INI-file configuration and finalised as strict YAML,
    the latter being Service's current confuguration file spec
  </li>
</ul>

<ProjectEntry
  name="RuNER"
  link="https://runer.workspad.com/"
  date="07.2019 - 12.2020"
  description="
    Russian language NLP/NLU solution designed
    to be integrated with chat bot platforms"
  participation="
    Application architecture,
    processing algorithm,
    core feature-set"
>
  Python (Tornado)
</ProjectEntry>

<ul>
  <li>
    Utilisation of Pandas/JypiterNB in order to capture avarage
    grammar usage and patterns
  </li>
  <li>
    Utilisation of NumPy for in-memory processing of high-order tokens
  </li>
</ul>


<ProjectEntry
  name="Linux-based VDI infrastructure"
  date="05.2019 - 07.2019"
  description="A single physical server hosts templated KVM/QEMU VMs with NVIDIA GPU being passed through"
>
  IOMMU |
  KVM/QEMU | Virsh | Python |
  debian-packaged shell scripts
</ProjectEntry>

<ul>
  <li>
    IOMMU groups setup with additional Kernel patching
  </li>
  <li>
    KVM/QEMU VM generation through virsh interfaces with python
  </li>
</ul>

<ProjectEntry
  name="Windows backup, replcation and storage infrastructure"
  date="09.2018 - 05.2019"
  description="VEEAM setup within a MS VMM-managed cluster inside
    of an AD forest.
    Part of the infrastructre required to support backup
    and replication, automatic hot and cold storage management
    of templated Windows VMs"
>
  MS Windows Server Nano | Powershell 5.1 |
  VEEAM B&R | Kerberos authentication setup |
  MS VMM integration with HYPER-V cluster
</ProjectEntry>

<div use:melt={$root}>
  <p use:melt={$trigger} id="something-else">There seems to be something more</p>
  <div use:melt={$content} class="danger">
    <p><code>- Detected presence of an invalid narrative representation within a component ...</code></p>
    <p><code>- Deploying Narraphysic Isolation Environment ...</code></p>
    <p><code>- Narraphysic Isolation Environment has being successfully deployed,
      targeted narrative representation is captured within
      the currently appropriate fabula</code>
    </p>
    <p><code>- Please, proceed to the fallback instructions included
      by the associated vendor</code>
    </p>
    <p><code>- Displaying filtered block contents ...</code>
    </p>

    <ProjectEntry type="mysterious-vendor-message"
      name="█████████ █████ ████"
      description="█ ████████████ ████████"
    >
      <MysteriousVendorMessage/>
    </ProjectEntry>
  </div>
  <br use:melt={$content}/>
</div>

<style>

h1, h2, h3 {
  color: rgb(245, 245, 220);
}

ul {
  margin-bottom: 2.3rem;
  margin-top: -1rem;

  & li {
    list-style-type: square;
    padding-top: 12px;
    color: hsl(13, 10%, 66%);
  }
}

p {
  font-weight: 350;
}

.danger {
  background-color: hsla(0, 89.2%, 21.8%, 0.8);
  border-radius: 2px;
  padding: 0.4em;
  filter: drop-shadow(0 0 2mm hsla(0, 89.2%, 21.8%, 1));
  margin: 0.6em 3em;

  & > p {
    text-align: left;
    margin: 1.3em;
    font-weight: bold;
    /* color: hsla(20, 88%, 50%, 0.8); */
  
    & > code {
      color: black;
      font-weight: 900;
      font-size: 1.4em;
      margin-right: 0.2em;
      color: hsla(20, 88%, 70%, 0.9);
    }
  }
}

#something-else {
  cursor: cell;
  font-weight: bolder;
  color: hsl(288, 5%, 18%);
}

</style>