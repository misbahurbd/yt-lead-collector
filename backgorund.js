const updateIcon = () => {
   chrome.action.disable()
   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      const exampleRule = {
         conditions: [
            new chrome.declarativeContent.PageStateMatcher({
               pageUrl: { hostSuffix: '.youtube.com' },
            }),
         ],
         actions: [new chrome.declarativeContent.ShowAction()],
      }
      const rules = [exampleRule]
      chrome.declarativeContent.onPageChanged.addRules(rules)
   })
}

const updateBaseText = () => {
   chrome.storage.sync.get(['badgeText'], (res) => {
      const newBadgeText = res.badgeText === 'ON' ? 'OFF' : 'ON'
      chrome.storage.sync.set(
         {
            badgeText: newBadgeText,
         },
         () => {
            chrome.action.setBadgeText({
               text: newBadgeText,
            })
         }
      )
   })
}

chrome.runtime.onInstalled.addListener(() => {
   updateIcon()

   chrome.storage.sync.set(
      {
         badgeText: 'ON',
      },
      () => {
         chrome.action.setBadgeText({
            text: 'ON',
         })
      }
   )
})

chrome.runtime.onStartup.addListener(() => {
   updateIcon()
   updateBaseText()
})

chrome.action.onClicked.addListener(() => {
   updateBaseText()
})
