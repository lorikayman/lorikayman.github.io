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
  participation="UI/UX design, transition to git, local dev/build environment development and integration into Mozilla Mach, various privacy enhancements, network communications analysis and reduction"
>
  js | css | python | rust
</ProjectEntry>

<ProjectEntry
  name="RuPost"
  link="https://rupost.ru"
  date="12.2020 - 02.2022"
  description="An out-of-the-box batteries-included
    IMAP/SMTP/CalDAV/CardDAV on-premise email server solution based on Postfix and Dovecot"
  participation="
    IMAP/SMPT-server components analysis and finalised selection,
    development of POC and additional development up to release v2.0,
    web interface (vanillaJS and knockoutJS iteration)"
>
  Python | JS | KnockoutJS
</ProjectEntry>

<ProjectEntry
  name="RuNER"
  link="https://runer.workspad.com/"
  date="07.2019 - 12.2020"
  description="Russian language NLP/NLU solution designed to be integrated with chat bot platforms"
  participation="application architecture, processing algorithm, core feature-set"
>
  Python
</ProjectEntry>


<ProjectEntry
  name="Linux-based VDI infrastructure w/ GPU passthrough"
  date="05.2019 - 07.2019"
  description="A single physical server hosts templated KVM/QEMU VMs with NVIDIA GPU being passed through"
>
  IOMMU groups setup | kernel patching | KVM/QEMU VM generation through virsh interfaces with python | deb-packaged shell-scripts
</ProjectEntry>

<ProjectEntry
  name="Windows Backup, replcation and storage infrastructure"
  date="09.2018-05.2019"
  description="MS Windows Server Nano VEEAM, VMM cluster within AD forest.
    A part of an infrastructre required to support backup,
    replication, hot and cold storage of templated Windows VMs
    for various products and their multiple host configurations"
>
  MS Windows Server Nano | Powershell 5.1 | VEEAM B&R | Kerberos authentication setup | MS VMM integration to HYPER-V cluster
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

h1, h2, h3, h4, h5, h6, p {
  color: rgb(245, 245, 220);
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